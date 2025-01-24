import math

class Stat_model:
    def __init__(self):
        pass

    def average(self, values: list[float]) -> float:
        if not values:
            return 0.0
        return round(sum(values) / len(values), 2)

    def deviation(self, values: list[float]) -> float:
        if not values:
            return 0.0
        avg = self.average(values)
        variance = sum((x - avg) ** 2 for x in values) / len(values)
        return round(math.sqrt(variance), 2)

    def intervals(self, values: list[float], n: int = 1) -> list[dict[str, float, str, float, str, int]]:
        if not values or n <= 0:
            return []

        min_value, max_value = min(values), max(values)
        step:float = round((max_value - min_value) / n, 2)

        classes:list[dict[str, float, str, float, str, int]] = []
        for i in range(n):
            lower_bound:float = round(min_value + i * step, 2)
            upper_bound:float = round(lower_bound + step, 2)
            
            count:int = sum(lower_bound <= value < upper_bound for value in values)
            
            if i == n - 1:
                count += sum(value == max_value for value in values)
                upper_bound = round(max_value, 2)
            
            classes.append({
                'lower_bound': lower_bound,
                'upper_bound': upper_bound,
                'elements_in_class': count
            })

        return classes

