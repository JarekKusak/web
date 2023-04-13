'''
0 .
1 ()

2 = 2^1 (()) -> ( 1 )
3 = 2^0*3^1 (.()) -> ( 0 1 )
4 = 2^2 ((())) -> ( 2 ) -> nastane zanoření
5 = 2^0*3^0*5^1 (..()) -> ( 0 0 1 )
6 = 2^1*3^1 (()())
7 = 2^0*3^0*5^0*7^1 (...())
atd.

když si rozložíme jednotlivá čísla na násobky prvočísel, tak jde vidět,
že jednotlivé hodnoty exponentů prvočísel udávají sekvenci (počet) teček a závorek uvnitř
"obalujících" závorek. Pokud je hodnota exponentu větší než 1, nastává vnořování.
'''