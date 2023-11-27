import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subscription, take, takeUntil, takeWhile } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { MapAlertTypeToBootstrapType } from 'src/app/models/AlertType';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @ViewChild('notificationContainer') 
  container!: ElementRef<HTMLDivElement>;

  private subscription!: Subscription;

  constructor(
    private notificationService: NotificationService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.subscription = this.notificationService.notification
      .pipe(take(1))
      .subscribe(alert => {        
        if(alert) {
          this.render(alert);
        }
      })
  }

  render(alert: Alert) {
    const notification = this.renderer.createElement("div");
    
    this.renderer.addClass(notification, "alert");
    this.renderer.addClass(notification, MapAlertTypeToBootstrapType(alert.type));
    const text = this.renderer.createText(alert.message);
    this.renderer.appendChild(notification, text);

    this.renderer.appendChild(this.container.nativeElement, notification);

    setTimeout(() => {
      this.renderer.setStyle(notification, "opacity", 0);
      this.subscription.unsubscribe();

      setTimeout(() => {
        this.renderer.removeChild(this.container.nativeElement, notification);
      }, 1000);
    }, alert.duration);

    this.ngOnInit();
  }

} 
