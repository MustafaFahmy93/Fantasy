
from random import shuffle

# players = [
#     30, 35, 40, 45, 50,
#     55, 60, 65, 70, 75,
#     80, 85, 90, 95, 100
# ]

# players = [
#     61, 89, 71, 82, 75,
#     64, 84, 72, 81, 77,
#     71, 82, 73, 81, 80
# ]
players = [
    61, 89, 71, 81, 75,
    64, 84, 72, 80, 76,
    71, 82, 73, 79, 77
]

# players = [
#     61, 89, 74, 82, 75,
#     64, 84, 72, 83, 77,
#     71, 82, 73, 81, 80
# ]


def teamsScore(teamA, teamB, teamC):
    a = sum(teamA)
    b = sum(teamB)
    c = sum(teamC)
    score = abs(a-b) + abs(a-c) + abs(b-c)
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


players.sort()
mins = players[0:3]
maxs = players[12:]
others = players[3:12]
# print(players)
# print(mins, maxs)
# print(others)
ll = 100000
teamA_last = []
teamB_last = []
teamC_last = []
for i in range(ll):
    shuffle(others)
    teamA = [maxs[0]]+[mins[2]]+others[0:3]
    teamB = [maxs[1]]+[mins[1]]+others[3:6]
    teamC = [maxs[2]]+[mins[0]]+others[6:]
    tScore = teamsScore(teamA, teamB, teamC)
    if tScore <= score:
        score = tScore
        teamA.sort()
        teamB.sort()
        teamC.sort()
        teamA_last = teamA
        teamB_last = teamB
        teamC_last = teamC
        # addTeam(teamA)
        # addTeam(teamB)
        # addTeam(teamC)
        if tScore == 0:
            addTeam(sortTeams(teamA, teamB, teamC))
    if len(teams) == 0 and i+1 == ll:
        print(teamA_last, teamB_last, teamC_last)
        print(sum(teamA_last), sum(teamB_last), sum(teamC_last))
        print(teamsScore(teamA_last, teamB_last, teamC_last))
        addTeam(sortTeams(teamA_last, teamB_last, teamC_last))
    # print(tScore, sortTeams(teamA, teamB, teamC))

for t in teams:
    print(t)


# new Algo
# first player
# dist max
# second player
# dist min
# third
# round
