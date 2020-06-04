import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu-resources',
  templateUrl: './menu-resources.component.html',
  styleUrls: ['./menu-resources.component.scss']
})
export class MenuResourcesComponent implements OnInit {

  @Input() menuControl = false;
  @Output() closeMenu = new EventEmitter<void>();

  resources: any[] = [
    {
      url: '/scrobble/bulk',
      title: 'Bulk Scrobble'
    },
    {
      url: '/scrobble/cache',
      title: 'Scrobbles em Cache'
    }
  ];

  ngOnInit() {

  }

}
