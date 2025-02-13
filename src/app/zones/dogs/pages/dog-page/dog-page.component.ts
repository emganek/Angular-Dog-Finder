import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, debounceTime, filter, of, Subject } from 'rxjs';
import { CommonUtils } from '../../../../shared/utils/common';
import { DogCardComponent } from '../../components/dog-card/dog-card.component';
import { DogDetailComponent } from '../../components/dog-detail/dog-detail.component';
import { DogOverviewComponent } from '../../components/dog-overview/dog-overview.component';
import { DogBreed } from '../../models/dog-breed';
import { DogVotePayLoad } from '../../models/dog-vote';
import { DogBreedService } from '../../services/dog-breed.service';
import { DogVoteService } from '../../services/dog-vote.service';
@Component({
  selector: 'app-dog-page',
  imports: [
    CommonModule,
    DogCardComponent,
    DogOverviewComponent,
    DogDetailComponent,
  ],
  templateUrl: './dog-page.component.html',
  styleUrl: './dog-page.component.scss',
})
export class DogPageComponent {
  //#region Consts

  private readonly PAGE_SIZE = 10;

  private readonly PARAM_KEYS = {
    pageIndex: 'pageIndex',
    dogIndex: 'dogIndex',
  };

  //#endregion

  //#region Fields

  currentDogIndex!: number;

  currentPageIndex!: number;

  data: DogBreed[] = [];

  userAction$ = new Subject<boolean>();

  viewMode: 'overview' | 'detail' = 'overview';

  isVoting = false;

  private isLoadingNewPage = false;

  private readonly dogIndexChange$ = new Subject<number>();

  private readonly pageIndexChange$ = new Subject<number>();

  private readonly takeUntilDestroyed$ = takeUntilDestroyed<any>();

  //#endregion

  //#region Constructor

  constructor(
    private dogBreedService: DogBreedService,
    private dogVoteService: DogVoteService,
    private messageService: MessageService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) {
    this.init();
  }

  //#endregion

  //#region Methods

  getData(page: number): void {
    this.dogBreedService
      .getBreeds({ limit: this.PAGE_SIZE, page })
      .pipe(
        catchError((error) => {
          this.updatePrams();
          return of(error);
        })
      )
      .subscribe((data) => {
        if (data && data.length) {
          this.data = data;

          // Update indexes
          if (this.isLoadingNewPage) {
            this.currentDogIndex = 0;
            this.isLoadingNewPage = false;
          }

          this.currentPageIndex = page;

          // Update index params
          this.updatePrams();
        }
      });
  }

  onChangeView(): void {
    if (this.viewMode === 'detail') {
      this.viewMode = 'overview';

      return;
    }

    this.viewMode = 'detail';
  }

  private init(): void {
    // Subscribe to Dog Index Change Event
    this.dogIndexChange$
      .pipe(
        this.takeUntilDestroyed$,
        filter((index) =>
          this.currentDogIndex == null ? true : index !== this.currentDogIndex
        )
      )
      .subscribe((index) => {
        if (index > this.PAGE_SIZE - 1) {
          this.isLoadingNewPage = true;
          this.pageIndexChange$.next(this.currentPageIndex + 1);
          return;
        }

        this.currentDogIndex = index;
        this.updatePrams(true);
      });

    // Subscribe to Page Index Change Event
    this.pageIndexChange$
      .pipe(
        this.takeUntilDestroyed$,
        filter((index) =>
          this.currentPageIndex == null ? true : index !== this.currentPageIndex
        )
      )
      .subscribe((index) => {
        this.getData(index);
      });

    // Subscribe to User Action Event
    this.userAction$
      .pipe(
        debounceTime(300),
        this.takeUntilDestroyed$,
        filter(() => !this.isVoting)
      )
      .subscribe((option) => this.onUserAction(option));

    this.route.queryParams.subscribe((params) => {
      this.syncParamToIndex(
        this.pageIndexChange$,
        this.PARAM_KEYS.pageIndex,
        params
      );

      this.syncParamToIndex(
        this.dogIndexChange$,
        this.PARAM_KEYS.dogIndex,
        params
      );
    });
  }

  private updatePrams(updateDogIndexOnly = false): void {
    const params = {
      [this.PARAM_KEYS.dogIndex]: this.currentDogIndex,
    };

    if (!updateDogIndexOnly) {
      params[this.PARAM_KEYS.pageIndex] = this.currentPageIndex;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private voteDog(option: boolean): void {
    const payload: DogVotePayLoad = {
      image_id: this.data[this.currentDogIndex].reference_image_id,
      sub_id: 'my-sub-it-12399',
      value: option ? 1 : -1,
    };

    this.isVoting = true;

    this.dogVoteService.vote(payload).subscribe({
      next: () => {
        this.isVoting = false;
        this.dogIndexChange$.next(this.currentDogIndex + 1);
        this.showToast(true);
      },
      error: () => {
        this.isVoting = false;
        this.showToast();
      },
    });
  }

  //#endregion

  //#region Event Handlers

  onUserAction(option: boolean): void {
    this.voteDog(option);
  }

  //#endregion

  //#region Helper

  private showToast(result?: boolean): void {
    this.messageService.add({
      severity: result ? 'success' : 'error',
      summary: result ? 'Success' : 'Error',
    });
  }

  private syncParamToIndex(
    stream: Subject<number>,
    paramKey: string,
    params: Params
  ): void {
    const pageIndex =
      params[paramKey] == null ? 0 : CommonUtils.parseNumber(params[paramKey]);

    stream.next(pageIndex);
  }

  //#endregion
}
