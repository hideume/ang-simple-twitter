import { Component , Input ,Output,OnInit,ViewChildren,
          EventEmitter,
          QueryList, 
          ElementRef} from '@angular/core';
import { Tweet } from './tweet';
import { Router } from '@angular/router';
//import { TwgetComponent } from './twget/twget.component';
//import { ComponentFactory, ComponentFactoryResolver,ViewContainerRef } from '@angular/core';
//import { animate } from '@angular/animations';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']

})
export class TweetComponent implements OnInit {

  //factory: ComponentFactory<TwgetComponent>;

  @Input() tweet: Tweet;
  @Input() retweet: Tweet;
  @Input() count: string;
  @Output() action = new EventEmitter<{property: string, tweet: Tweet}>();
  @ViewChildren('imgtags',{read:ElementRef}) imgs:QueryList<ElementRef>;


  constructor(
    //public viewContainerRef: ViewContainerRef,
    //private resolver: ComponentFactoryResolver
    private route:Router //routerLinkのために必要だと思っているのだが・・
  ){
    //this.mediaurl = "tweet.entities?.media[0].media_url_https";
  };


  ngOnInit() {
    //this.factory = this.resolver.resolveComponentFactory(TwgetComponent);
    //this.viewContainerRef.createComponent(this.factory);
  }



  hasPhoto(tweet: Tweet) {
    if (tweet.entities.media
        && tweet.entities.media.length 
        && tweet.entities.media[0].type === 'photo') {
      return true;
    }
    return false;
  }

  //2
  hasPhoto2(tweet: Tweet) {
    if (tweet.entities.media
        && tweet.extended_entities.media.length > 1 ) {
      return true;
    }
    return false;
  }

  toggleAction(property: 'favorite'|'retweet') {
    this.action.emit({property, tweet: this.tweet});
  }

  TWstatus(msg: any){
    console.log(msg);
  }

  imagemv(norp,tweet: Tweet){
    let setno = this.getnum();
    let i = 0;
    if(norp==1){
     //nextの場合、次をblockとする。
      setno = Math.min(setno + 1,this.imgs.length - 1);
    }else{
      //backの場合、前をblockとする。
      setno = Math.max(setno-1,0)
    }
    this.imgs.forEach(im =>{
      if(i==setno){
        im.nativeElement.style.display = "block";
      }else{
        im.nativeElement.style.display = "none";
      }
      i=i+1;
    });
  }

  // blockのある番号を返す
  getnum():number {
    let i = 0;
    let ri = 0;
    this.imgs.forEach(im =>{
      if(im.nativeElement.style.display=='block'){
        ri = i;
      };
      i=i+1;
    });
    return ri;
  };
}
