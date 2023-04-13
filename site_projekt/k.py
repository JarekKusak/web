def generate(digits, sum, result=0, start=1):
    if sum == 0 and start == 0:
        print(result)
    elif digits > 0:
        low = max(start, sum - (digits - 1) * 9)
        high = min(9, sum)
        for digit in range(low, high + 1):
            generate(digits - 1, sum - digit, result + digit * 10 ** (digits - 1), 0)
