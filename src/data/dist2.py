

players = [
    30, 35, 40, 45, 50,
    55, 60, 65, 70, 75,
    80, 85, 90, 95, 100,
    80, 85, 90, 95, 100
]
# players = [
#     60, 80, 80, 70, 90,
#     55, 95, 75, 90, 60,
#     55, 85, 90, 95, 100
# ]
#  95 90 85 40 45
nP = len(players)
nTeam = 3
teamSize = 5
# nTeam = min(nTeam, int(nP/teamSize))
print(sum(players)/nTeam)
# a = [0, 3, 6, x-3, x]
# b = [1, 4, 7, x-4, x-1]
# c = [2, 5, 8, x-5, x-2]

out = [[], [], []]
count = nTeam * 3
rcount = 0
index = 0
minSwitch = True
for x in range(teamSize):
    for nteam in range(nTeam):
        # minSwitch = False
        if len(players) != 0 and len(out[nteam]) < teamSize:
            # print(players)
            if (minSwitch):
                minV = min(players)
                out[nteam].append(minV)
                del players[0]
            else:
                maxV = max(players)
                out[nteam].append(maxV)
                del players[-1]
    if(minSwitch):
        minSwitch = False
    else:
        minSwitch = True

        index += 1


print(out)
print(sum(out[0]))
print(sum(out[1]))
print(sum(out[2]))
