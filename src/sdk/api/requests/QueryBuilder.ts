class QueryBuilder {
  private builder: string[];

  constructor(prefix: string) {
    this.builder = [prefix, '?'];
  }

  public add(key: string, value: string | number | boolean) {
    if (this.builder.length === 1) {
      this.builder.push('?');
    } else {
      this.builder.push('&');
    }
    this.builder.push(key);
    this.builder.push('=');
    this.builder.push(value.toString());
  }

  public addMany(key: string, value: string[] | number[]) {
    value.forEach((v, _) => {
      this.add(key, v);
    });
  }

  public build(): string {
    return this.builder.join('');
  }
}

export default QueryBuilder;
