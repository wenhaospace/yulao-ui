import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  days = 90; // 显示最近多少天
  weeks: ({ date: Date; value: number } | null)[][] = [];

  ngOnInit(): void {
    this.buildHeatmap(this.days);
  }

  private buildHeatmap(days: number) {
    const today = new Date();
    const realStart = new Date();
    realStart.setDate(today.getDate() - (days - 1));
    // 将 start 向前扩展到最近的 Sunday，使列对齐
    const start = new Date(realStart);
    while (start.getDay() !== 0) {
      start.setDate(start.getDate() - 1);
    }

    // 生成伪数据（真实项目请替换为你的数据源，key：yyyy-mm-dd -> value）
    const values = new Map<string, number>();
    for (let i = 0; i < days; i++) {
      const d = new Date();
      d.setDate(today.getDate() - i);
      const key = this.keyOf(d);
      values.set(key, Math.floor(Math.random() * 5)); // 0-4 等级
    }

    const weeks: ({ date: Date; value: number } | null)[][] = [];
    let week: ({ date: Date; value: number } | null)[] = [];

    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      const copy = new Date(d);
      const key = this.keyOf(copy);
      if (copy < realStart) {
        week.push(null); // padding
      } else {
        week.push({ date: copy, value: values.get(key) ?? 0 });
      }

      if (copy.getDay() === 6) { // Saturday => end of week (Sunday-start columns)
        weeks.push(week);
        week = [];
      }
    }
    // push last partial week
    if (week.length) weeks.push(week);

    this.weeks = weeks;
  }

  private keyOf(d: Date) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

}
