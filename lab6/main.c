#include <stdio.h>

int main() {
    int n, k, i;
    double x, sum = 0.0;
    
    printf("Введите n: ");
    scanf("%d", &n);
    printf("Введите x: ");
    scanf("%lf", &x);
    
    if (n < 1) {
        printf("Ошибка: n должно быть положительным целым числом\n");
        return 1;
    }
    
    for (k = 1; k <= n; k++) {
        long long fact2K = 1;
        double power2Kx = 1;
        
        // Вычисление (2k)!
        for (i = 1; i <= 2 * k; i++) {
            fact2K *= i;
        }
        
        // Вычисление x^(2k)
        for (i = 0; i < 2 * k; i++) {
            power2Kx *= x;
        }
        
        // Вычисление A_k по формуле: ((-1)^k * (2*k^2 + 1)) / (2*k)! * x^(2*k)
        double sign = (k % 2 == 0) ? 1.0 : -1.0; // (-1)^k
        double numerator = (2.0 * k * k + 1.0);
        double term = sign * numerator / fact2K * power2Kx;
        
        sum += term;
        
        printf("A(%d) = %e\n", k, term);
    }
    
    printf("Сумма %d членов ряда: %e\n", n, sum);
    return 0;
}
