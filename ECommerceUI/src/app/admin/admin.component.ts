import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { Product, Category } from '../models/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {}

  addCategory(category: string, subcategory: string): void {
    const newCategory: Category = {
      category: category,
      subCategory: subcategory,
      id: 0
    };
    this.adminService.addCategory(newCategory).subscribe(
      response => {
        console.log(response);
        // Handle success response
      },
      error => {
        console.error(error);
        // Handle error response
      }
    );
  }

  updateCategory(id: number, category: string, subcategory: string): void {
    const updatedCategory: Category = {
      id: id,
      category: category,
      subCategory: subcategory
    };
    this.adminService.updateCategory(id, updatedCategory).subscribe(
      response => {
        console.log(response);
        // Handle success response
      },
      error => {
        console.error(error);
        // Handle error response
      }
    );
  }

  deleteCategory(id: number): void {
    this.adminService.deleteCategory(id).subscribe(
      response => {
        console.log(response);
        // Handle success response
      },
      error => {
        console.error(error);
        // Handle error response
      }
    );
  }

  getProducts(category: string, subcategory: string, count: number): void {
    this.adminService.getProducts(category, subcategory, count).subscribe(
      (response: Product[]) => {
        console.log(response);
        // Handle success response
      },
      error => {
        console.error(error);
        // Handle error response
      }
    );
  }

  getProductCategory(id: number): void {
    this.adminService.getProductCategory(id).subscribe(
      (response: Category) => {
        console.log(response);
        // Handle success response
      },
      error => {
        console.error(error);
        // Handle error response
      }
    );
  }
}
