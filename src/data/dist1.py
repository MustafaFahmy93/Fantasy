

players = [
    30, 35, 40, 45, 50,
    # 55, 60, 65, 70, 75,
    80, 85, 90, 95, 100
]
# players = [
#     60, 80, 80, 70, 90,
#     55, 95, 75, 90, 60,
#     55, 85, 90, 95, 100
# ]

nP = len(players)-1
nTeam = 3
teamSize = 5
# a = [0, 3, 6, x-3, x]
# b = [1, 4, 7, x-4, x-1]
# c = [2, 5, 8, x-5, x-2]

out = [[], [], []]
count = nTeam * 3
rcount = 0
index = 0
for x in range(teamSize):
    for nteam in range(nTeam):

        if(index < count and index <= nP):
            # print(index)
            out[nteam].append(players[index])
        else:
            # print(nP-rcount)
            out[nteam].append(players[nP-rcount])
            rcount += 1
        index += 1

print(out)
print(sum(out[0]))
print(sum(out[1]))
