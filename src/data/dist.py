
from random import shuffle

# players = [
#     30, 35, 40, 45, 50,
#     55, 60, 65, 70, 75,
#     80, 85, 90, 95, 100
# ]

players = [
    61, 89, 71, 82, 75,
    64, 84, 72, 81, 77,
    71, 82, 73, 81, 80
]

# players = [
#     61, 89, 71, 81, 75,
#     64, 84, 72, 80, 76,
#     71, 82, 73, 79, 77
# ]

#


def teamsScore(teamA, teamB, teamC):
    a = sum(teamA)
    b = sum(teamB)
    c = sum(teamC)
    score = abs(a-b) + abs(a-c) + abs(b-c)
    return score


def teamScore(team):
    score = 0
    for i in range(len(team)):
        for j in range(len(team)):
            if j > i:
                score += abs(team[i]-team[j])
    return score


def teamsOVR(a, b, c):
    score = abs(a-b) + abs(a-c) + abs(b-c)
    # score = max(a, b, c)-min(a, b, c)
    return score


shuffle(players)
teams = []
teamA_OVR = 0
teamB_OVR = 0
teamC_OVR = 0
score = 1000  # => best score = abs(A-B) + abs(B-C) + abs(A-C)


def addTeam(team):
    global teams
    if team not in teams:
        teams.append(team)


def sortTeams(teamA, teamB, teamC):
    captainMax = max(teamA[-1], teamB[-1], teamC[-1])
    captainMin = min(teamA[-1], teamB[-1], teamC[-1])
    maxTeam = []
    minTeam = []
    if captainMax == teamA[-1]:
        maxTeam = teamA
        if captainMin == teamB[-1]:
            minTeam = teamB
            return [minTeam, teamC, maxTeam]
        if captainMin == teamC[-1]:
            minTeam = teamC
            return [minTeam, teamB, maxTeam]

    if captainMax == teamB[-1]:
        maxTeam = teamB
        if captainMin == teamA[-1]:
            minTeam = teamA
            return [minTeam, teamC, maxTeam]
        if captainMin == teamC[-1]:
            minTeam = teamC
            return [minTeam, teamA, maxTeam]

    if captainMax == teamC[-1]:
        maxTeam = teamC
        if captainMin == teamA[-1]:
            minTeam = teamA
            return [minTeam, teamB, maxTeam]
        if captainMin == teamB[-1]:
            minTeam = teamB
            return [minTeam, teamA, maxTeam]


teamA_last = []
teamB_last = []
teamC_last = []
myScore = 10000
for _ in range(100000):
    shuffle(players)
    teamA = players[0:5]
    teamB = players[5:10]
    teamC = players[10:]
    tScore = teamsScore(teamA, teamB, teamC)
    if tScore <= score:
        score = tScore
        a, b, c = teamScore(teamA), teamScore(teamB), teamScore(teamC)
        tOVR = teamsOVR(a, b, c)
        if (tScore*tScore)+(tOVR/100) <= myScore:
            myScore = (tScore*tScore)+(tOVR/100)
            teamA.sort()
            teamB.sort()
            teamC.sort()
            # teamA_last = teamA
            # teamB_last = teamB
            # teamC_last = teamC
            # addTeam(teamA)
            # addTeam(teamB)
            # addTeam(teamC)
            # print(tScore)
            # if tScore == 2:
            # addTeam(sortTeams(teamA, teamB, teamC))
            teams.append([teamA, teamB, teamC])
    # print(tScore, sortTeams(teamA, teamB, teamC))
# if len(teams) == 0:
#     print(teamsScore(teamA_last, teamB_last, teamC_last))
#     addTeam(sortTeams(teamA, teamB, teamC))
    # print(teamA_last, teamB_last, teamC_last)
print(len(teams))
for t in teams:
    # print(t)
    a, b, c = teamScore(t[0]), teamScore(t[1]), teamScore(t[2])
    tOVR = teamsOVR(a, b, c)
    tScore = teamsScore(t[0], t[1], t[2])
    # print(t, a, b, c, tScore, tOVR, tScore*tScore*tOVR)

    print(t, [a, b, c], tScore, tOVR, (tScore*tScore)+(tOVR/100))


# [[61, 77, 80, 81, 82], [71, 72, 73, 81, 84], [64, 71, 75, 82, 89]]
# [[64, 72, 81, 82, 82], [71, 71, 75, 80, 84], [61, 73, 77, 81, 89]]
# [[71, 71, 77, 81, 81], [64, 73, 80, 82, 82], [61, 72, 75, 84, 89]]
# [[61, 77, 80, 81, 82], [71, 71, 73, 82, 84], [64, 72, 75, 81, 89]]
# [[71, 72, 75, 81, 82], [61, 73, 81, 82, 84], [64, 71, 77, 80, 89]]
# [[71, 71, 75, 82, 82], [64, 72, 80, 81, 84], [61, 73, 77, 81, 89]]
# [[61, 75, 81, 82, 82], [71, 72, 73, 81, 84], [64, 71, 77, 80, 89]]
# [[71, 72, 77, 80, 81], [61, 73, 81, 82, 84], [64, 71, 75, 82, 89]]
# [[64, 75, 80, 81, 81], [71, 71, 73, 82, 84], [61, 72, 77, 82, 89]]
# [[71, 73, 75, 81, 81], [64, 71, 80, 82, 84], [61, 72, 77, 82, 89]]
# [[71, 72, 75, 81, 82], [61, 77, 80, 81, 82], [64, 71, 73, 84, 89]]
# [[71, 72, 77, 80, 81], [61, 75, 81, 82, 82], [64, 71, 73, 84, 89]]
# [[71, 71, 77, 80, 82], [61, 73, 81, 82, 84], [64, 72, 75, 81, 89]]
# [[64, 72, 81, 82, 82], [61, 75, 80, 81, 84], [71, 71, 73, 77, 89]]
# [[71, 73, 75, 81, 81], [61, 72, 82, 82, 84], [64, 71, 77, 80, 89]]
# [[71, 72, 75, 81, 82], [64, 71, 80, 82, 84], [61, 73, 77, 81, 89]]
# [[71, 73, 75, 80, 82], [64, 71, 81, 81, 84], [61, 72, 77, 82, 89]]
# [[61, 77, 80, 81, 82], [71, 72, 75, 81, 82], [64, 71, 73, 84, 89]]
# [[64, 73, 81, 81, 82], [71, 71, 75, 80, 84], [61, 72, 77, 82, 89]]


# [[61, 75, 81, 82, 82],
# [64, 72, 80, 81, 84],
# [71, 71, 73, 77, 89]]
# 98 98 84 28


# new Algo
# first player
# dist max
# second player
# dist min
# third
# round

# [[71, 73, 75, 81, 81], [64, 71, 80, 82, 84], [61, 72, 77, 82, 89]]
# 56 102 132 152
# [[61, 75, 81, 82, 82], [64, 72, 80, 81, 84], [71, 71, 73, 77, 89]]
# 98 98 84 14
# New algo
# create balance teams => teams score = 0
# # if there is more than one team select lower teamsOVR
# # if there is no team select the lower teams score

# [[71, 71, 73, 77, 89], [64, 72, 80, 81, 84], [61, 75, 81, 82, 82]][84, 98, 98] 0 28 0.28
