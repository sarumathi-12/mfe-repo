import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GeneralActions from './general-info.actions';
import { mergeMap, map, catchError, of } from 'rxjs';
import { GeneralInfoService } from 'src/app/debt/services/general-info.service';

@Injectable()

export class GeneralInfoEffects {

    constructor(
        private actions$: Actions,
        private service: GeneralInfoService
    ) { }

    loadInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(GeneralActions.loadGeneralInfo),
            mergeMap(() =>
                this.service.getGeneralInfo().pipe(
                    mergeMap(generalInfo =>
                        this.service.getBalanceInfo().pipe(
                            map(balanceInfo =>
                                GeneralActions.loadGeneralInfoSuccess({ generalInfo, balanceInfo })
                            )
                        )
                    ),
                    catchError(error =>
                        of(GeneralActions.loadGeneralInfoFailure({ error }))
                    )
                )
            )
        )
    );
}
