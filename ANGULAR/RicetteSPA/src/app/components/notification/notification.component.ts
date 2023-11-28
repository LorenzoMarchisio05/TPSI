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

  constructor(
    private notificationService: NotificationService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    const subscription = this.notificationService.notification
      .subscribe((alert) => {        
        if(alert) {
          this.render(alert);
        }

        subscription.unsubscribe();
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

      setTimeout(() => {
        this.renderer.removeChild(this.container.nativeElement, notification);
      }, 350);
    }, alert.duration);

    this.ngOnInit();
  }

} 
