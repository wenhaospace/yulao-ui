import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() currentPage = 1; // 当前页
  @Input() itemsPerPage = 10; // 每页显示条数
  @Input() totalItems = 0; // 总条数
  @Output() pageChange = new EventEmitter<number>(); // 页码变化事件


    get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

}
