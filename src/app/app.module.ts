import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { MomentModule } from 'angular2-moment';

import { AppComponent } from './app.component';
import { TweetComponent } from './shared/tweet.component';
import { TweetsComponent } from './tweets/tweets.component';
import { TweetPipe } from './shared/tweet.pipe';
import { LimitComponent } from './limit/limit.component';
import { AppRoutingModule } from './app-routing.module';
import { UserTimelineComponent } from './user-timeline/user-timeline.component';
import { UserComponent } from './user/user.component';
import { RetweetComponent } from './retweet/retweet.component';
import { RetweetGraphComponent } from './retweetgraph/retweetgraph.component';
import { SearchComponent } from './search/search.component';
import { TweetService } from './shared/tweet.service';

@NgModule({
  declarations: [
    AppComponent,
    TweetComponent,
    TweetsComponent,
    TweetPipe,
    LimitComponent,
    UserTimelineComponent,
    UserComponent,
    RetweetComponent,
    RetweetGraphComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ClarityModule,
    MomentModule,
    AppRoutingModule,
  ],
  exports: [
    UserTimelineComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
