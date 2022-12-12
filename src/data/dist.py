

players = [
    30, 35, 40, 45, 50,
    55, 60, 65, 70, 75,
    80, 85, 90, 95, 100
]
# players = [
#     60, 80, 80, 70, 90,
#     55, 95, 75, 90, 60,
#     55, 85, 90, 95, 100
# ]
x = 14
# a = [30, 100, 45, 85, 60]
a = [0, 3, 6, x-3, x]
# b = [35, 95, 50, 80, 65]
b = [1, 4, 7, x-4, x-1]
# c = [40, 90, 55, 75, 70]
c = [2, 5, 8, x-5, x-2]

d = [0, 2, 4, x-2, x]
e = [1, 3,  5, x-3, x-1]
# print(sum(players))
print(sum(players)/3)
for t in [a, b, c, d, e]:
    p = 0
    print("=======")
    for i in range(5):
        # p += (t[i])
        p += (players[t[i]])
    print(p)


# print(sum(a))
# print(sum(b))
# print(sum(c))
# d = []
# e = []
# f = []
# players = sorted(players)
# count = 1
# for i in range(0, 9, 3):
#     # print(i)
#     d.append(players[i])
#     e.append(players[i+1])
#     f.append(players[i+2])

# for i in reversed(range(9, 15, 3)):
#     # print(i)
#     d.append(players[i+2])
#     e.append(players[i+1])
#     f.append(players[i])

# print("=======================")
# print([d, sum(d)/5])
# print([e, sum(e)/5])
# print([f, sum(f)/5])
