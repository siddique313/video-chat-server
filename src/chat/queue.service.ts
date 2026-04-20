import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
  private items: string[] = [];

  enqueue(id: string): void {
    if (!this.items.includes(id)) this.items.push(id);
  }

  dequeue(): string | undefined {
    return this.items.shift();
  }

  remove(id: string): void {
    this.items = this.items.filter((item) => item !== id);
  }

  has(id: string): boolean {
    return this.items.includes(id);
  }

  size(): number {
    return this.items.length;
  }

  print(): void {
    console.log('QUEUE:', this.items);
  }
}