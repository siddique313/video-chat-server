export declare class QueueService {
    private items;
    enqueue(id: string): void;
    dequeue(): string | undefined;
    remove(id: string): void;
    has(id: string): boolean;
    size(): number;
    print(): void;
}
