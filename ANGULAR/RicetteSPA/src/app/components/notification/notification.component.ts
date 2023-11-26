import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { takeWhile } from 'rxjs';
import { Alert } from 'src/app/models/Alert';
import { AlertType, MapAlertTypeToBootstrapType } from 'src/app/models/AlertType';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @ViewChild('notificationContainer') container!: ElementRef<HTMLDivElement>;
  exists: boolean = true;

  constructor(
    private notificationService: NotificationService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
    this.notificationService.notification
      .pipe(takeWhile(() => this.exists))
      .subscribe(alert => {        
        console.log(alert);
        if(alert) {
          this.render(alert);
        }
      })
  }

  render(alert: Alert) {
    const notification = this.renderer.createElement("div");
    const html = `
    <div class="alert ${MapAlertTypeToBootstrapType(alert.type)}" role="alert" #notificationContainer>
      ${alert.message}
    </div>
    `;
    const text = this.renderer.createText(html);

    this.renderer.appendChild(notification, text);


    this.ngOnInit();
  }

  ngOnDestroy() {
    this.exists = false;
  }
} 
