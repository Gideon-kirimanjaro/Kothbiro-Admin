import firebase from "../firebase";

// https://firebaseio.com/
const db = firebase.ref("/tournamentapp-553d2");

class FirebaseService {
  // create new group
  createGroup(group) {
    return db.child("/groups").push(group);
  }

  // get all groups
  getAll() {
    return db.child("/groups");
  }
  //getKnockOut
  getKnockOut() {
    return db.child("/knockout");
  }
  getRoundOf16() {
    return db
      .child("/knockout")
      .child("/round_of_16")
      .child("teams");
  }

  // create new team
  createNewTeam(groupKey, team) {
    return db
      .child("/groups")
      .child(groupKey)
      .child("/teams")
      .push(team);
  }
  //Gid
  addRoundOf16Team(team) {
    return db
      .child("/knockout")
      .child("/round_of_16")
      .child("/teams")
      .push(team);
  }
  addKnockOutFixture(fixture) {
    return db
      .child("/knockout")
      .child("/round_of_16")
      .child("/fixtures")
      .push(fixture);
  }
  // get all teams in groups
  getGroupTeams(groupKey) {
    return db
      .child("/groups")
      .child(groupKey)
      .child("/teams");
  }

  // add Player

  addPlayer(groupKey, teamKey, player) {
    return db
      .child("/groups")
      .child(groupKey)
      .child("/teams")
      .child(teamKey)
      .child("/players")
      .push(player);
  }

  // get a Player

  getPlayer(groupKey, teamKey, playerKey) {
    return db
      .child("/groups")
      .child(groupKey)
      .child("/teams")
      .child(teamKey)
      .child("/players")
      .child(playerKey);
  }

  // Delete player
  deletePlayer(groupKey, teamKey, playerKey) {
    return db
      .child("/groups")
      .child(groupKey)
      .child("/teams")
      .child(teamKey)
      .child("/players")
      .child(playerKey)
      .remove();
  }

  // Knockout Stage
  // Round of 16
  addRoundOf16(fixture) {
    return db
      .child("/knockout")
      .child("/round_of_16")
      .push(fixture);
  }
  // add quarters
  addQuarters(fixture) {
    return db
      .child("/knockout")
      .child("/quarters")
      .push(fixture);
  }
  // add semi finals
  addSemiFinal(fixture) {
    return db
      .child("/knockout")
      .child("/semi_final")
      .push(fixture);
  }
  // add finalle
  addFinal(fixture) {
    return db
      .child("/knockout")
      .child("/final")
      .push(fixture);
  }

  uploadFile(post) {
    return db.child("/photos").push(post);
  }

  // Create Group stage matches
  createNewMatch(key, match) {
    return db
      .child("/groups")
      .child(key)
      .child("/matches")
      .push(match);
  }
  getAllFixturesInGroup(key) {
    return db.child("/groups").child(key);
  }

  createNewFixture(key, fixture) {
    return db
      .child("/groups")
      .child(key)
      .child("/fixtures")
      .push(fixture);
  }

  updateMatch(key, matchkey, match) {
    return db
      .child("/groups")
      .child(key)
      .child("/matches")
      .child(matchkey)
      .update(match);
  }

  addMerchandiseToTeam(key, teamkey, merchandise) {
    return db
      .child("/groups")
      .child(key)
      .child("/teams")
      .child(teamkey)
      .child("/merchandises")
      .push(merchandise);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteTeam(groupKey, teamKey) {
    return db
      .child("/groups")
      .child(groupKey)
      .child("/teams")
      .child(teamKey)
      .remove();
  }

  addTeamGeneralPoints(groupKey, teamKey, value) {
    return db
      .child("/groups")
      .child(groupKey)
      .child("/teams")
      .child(teamKey)
      .child("general")
      .push(value);
  }

  updateFixture(groupKey, fixtureKey, value) {
    return db
      .child("/groups")
      .child(groupKey)
      .child("/fixtures")
      .child(fixtureKey)
      .child("events")
      .push(value);
  }

  updateTeamLogo(groupKey, teamKey) {
    return db
      .child("/groups")
      .child(groupKey)
      .child("/teams")
      .child(teamKey)
      .remove();
  }

  deleteAll() {
    return db.remove();
  }
}
//GIDI

export default new FirebaseService();
