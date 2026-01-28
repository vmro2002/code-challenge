var sum_to_n_a = function(n) {
    // your code here
    return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
    // your code here
    if (n <= 1) return n;
    return n + sum_to_n_b(n - 1);
};

var sum_to_n_c = function(n) {
    // your code here
    let sum = 0;
    let left_pointer = 1;
    let right_pointer = n;

    while (left_pointer <= right_pointer) {
      if (left_pointer === right_pointer) {
        sum += left_pointer;
      } else {
        sum += left_pointer + right_pointer;
      }
      left_pointer++;
      right_pointer--;
    }

    return sum;
};