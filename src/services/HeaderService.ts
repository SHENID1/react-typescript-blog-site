export default class HeaderService {
    static getHeader(name: string): string[] {
        switch (name) {
            case '/categories/all':
                return ['settings:all'];
            case '/contacts':
                return ['3'];
            case '/about':
                return ['4'];
            case '/subscribe':
                return ['5'];
            case '/':
                return ['1'];

            default:
                break
        }
        if (name.startsWith('/categories/')) {
            const newName = name.slice(12);
            return [`settings:${newName}`, `settings:all`];
        }
        if (name.startsWith('/post/')) {
            return [`settings:all`];
        }

        return [name];
    }
}