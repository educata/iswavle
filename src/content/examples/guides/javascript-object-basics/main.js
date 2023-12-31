// შევქმენით math ობიექტი და მასში მოვათავსეთ 2 ფუნქცია
// fibonacci - ფუნქცია პარამეტრად ღებულობს რიცხვს, თუ მერამდენე სერიაც გვაინტერესებს, რეკურსიულად მუშაობს ფუნქცია მანამ სანამ 1 არ გაუტოლდება n.
// root - ფუნქცია დააბრუნებს ფესვის მნიშვნელობას, გადაეცემა 2 მნიშვნელობა: x (რა რიცხვის ფესვიც გვინდა), y (მერამდენე ფესვის მნიშვნელობა).
const math = {
  fibonacci(n, memo = {}) {
    if (n <= 1) {
      // რეკურსიის გაწყვეტის ადგილი
      return n;
    }

    // ოპტიმიზაციის მეთოდი, უკვე ნაპოვნი ელემენტის ხელმეორედ გამოყენებისთვის
    if (memo[n]) {
      return memo[n];
    } else {
      memo[n] = this.fibonacci(n - 1, memo) + this.fibonacci(n - 2, memo);
      return memo[n];
    }
  },
  root(x, n = 2) {
    // ცოტა მათემატიკა (https://en.wikipedia.org/wiki/Square_root)
    return x ** (1 / n);
  },
};

console.log(math.fibonacci(7)); // დააბრუნებს ფიბონაჩის მიმდევრობინად 7 სერიას
console.log(math.root(27, 3)); // დააბრუნებს 27-ს კუბურ ფესვს
