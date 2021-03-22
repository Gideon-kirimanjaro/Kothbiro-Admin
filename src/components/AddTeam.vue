<template>
  <v-card>
    <v-card-title>
      <h4>Add team</h4>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="name"
          prepend-icon="mdi-account-circle"
          required
          v-model="teamName"
        />
        <v-layout row>
          <v-flex md6 offset-sm1>
            <div>
              <div>
                <v-btn @click="click1">choose photo</v-btn>
                <input
                  type="file"
                  ref="input1"
                  style="display: none"
                  @change="previewImage"
                  accept="image/*"
                />
              </div>

              <div v-if="imageData != null">
                <img class="preview" height="268" width="356" :src="img1" />
                <br />
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="saveTeam" color="info">Add Team</v-btn>
    </v-card-actions>

    <v-alert v-if="message" type="success">
      {{ message }}
    </v-alert>
    <v-alert v-if="error" type="success">
      {{ error }}
    </v-alert>
  </v-card>
</template>

<script>
import FirebaseService from "../services/FirebaseService";
import firebase from "firebase/app";

export default {
  name: "addteam",
  props: ["groupInfo"],
  data() {
    return {
      teamName: "",
      message: "",
      group: null,
      error: "",
      img1: "",
      imageData: null
    };
  },

  watch: {
    groupInfo: function(groupInfo) {
      console.log("new is", groupInfo);
      this.group = { ...groupInfo };
      this.message = "";
    }
  },

  methods: {
    previewImage(event) {
      this.uploadValue = 0;
      this.img1 = null;
      this.imageData = event.target.files[0];
      this.onUpload();
    },

    onUpload() {
      this.img1 = null;
      const storageRef = firebase
        .storage()
        .ref(`${this.imageData.name}`)
        .put(this.imageData);
      storageRef.on(
        `state_changed`,
        snapshot => {
          this.uploadValue =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error => {
          console.log(error.message);
        },
        () => {
          this.uploadValue = 100;
          storageRef.snapshot.ref.getDownloadURL().then(url => {
            this.img1 = url;
            console.log(this.img1);
          });
        }
      );
    },
    click1() {
      this.$refs.input1.click();
    },
    saveTeam() {
      const data = {
        name: this.teamName,
        icon: this.img1
      };
      var parsedobj = JSON.parse(JSON.stringify(this.group));

      FirebaseService.createNewTeam(parsedobj.key, data)
        .then(() => {
          this.message = "The Team was updated successfully!";
          this.teamName = "";
          this.img1 = "";
        })
        .catch(e => {
          this.error = e;
        });
    }
  },
  mounted() {
    this.message = "";
    this.group = { ...this.groupInfo };
  }
};
</script>
