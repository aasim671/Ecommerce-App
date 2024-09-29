import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menu: string = 'default';
  sellerName: string = ''
  constructor(private router: Router) { }



  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menu = 'seller'
          if (localStorage && localStorage.getItem('seller')
          ) {
            let data = localStorage.getItem('seller');
            let dataInformat = data && JSON.parse(data)[0];
            this.sellerName = dataInformat.name;

          }
        }
        else {
          this.menu = 'default'
        }
      }
    })
  }


  logout() {
    localStorage.removeItem('seller')
    this.router.navigate(['home']);
  }

}
