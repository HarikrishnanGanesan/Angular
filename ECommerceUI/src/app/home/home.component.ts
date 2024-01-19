import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { SuggestedProduct } from '../models/models';
import { Router } from '@angular/router';
import { Category, NavigationItem } from '../models/models';
import { NavigationService } from '../services/navigation.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

  suggestedProducts: SuggestedProduct[] = [
    {
      banerimage: 'Baner/Canon banner 1.jpg',
      category: {
        id: 0,
        category: 'DSLR',
        subCategory: 'Canon',
      },
    },
    {
      banerimage: 'Baner/sony banner.jpg',
      category: {
        id: 1,
        category: 'DSLR',
        subCategory: 'Sony',
      },
    },
    {
      banerimage: 'Baner/nikon banner.jpg',
      category: {
        id: 0,
        category: 'DSLR',
        subCategory: 'Nikon',
      },
    },
    {
      banerimage: 'Baner/accessories banner.jpg',
      category: {
        id: 0,
        category: 'Others',
        subCategory: 'Camera Accessories',
      },

    },
  ];
  constructor(private router: Router) {}

  navigateToSubcategory(category: string, subcategory: string) {
    this.router.navigate(['/products'], { queryParams: { category, subcategory } });
  }

  ngOnInit(): void {}
}
