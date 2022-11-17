import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { GuardService } from '@app/service';
// import { UploadComponent, WelcomeComponent } from '@component';
import { UploadComponent, WelcomeComponent } from '@component';

export const appRoutes: Routes = [
	{ path: '', component: WelcomeComponent, canActivate: [] },
	{ path: 'upload', component: UploadComponent, canActivate: [] }
];
@NgModule({
	imports: [CommonModule, RouterModule, RouterModule.forRoot(appRoutes, { useHash: true, onSameUrlNavigation: `reload` })],
	declarations: [],
	// providers: [GuardService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
	exports: [RouterModule]
})
export class AppRoutingModule {}
