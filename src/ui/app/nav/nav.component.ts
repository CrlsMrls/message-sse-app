import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { MessageStoreService } from '../messages/messages.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  newMessages$: Observable<number>;

  constructor(private messageStore: MessageStoreService) {
    this.newMessages$ = this.messageStore.newMessages$;
  }
}
