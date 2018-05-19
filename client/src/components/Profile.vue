 <template>
  <v-container fluid>
  <!--   <nav class="navbar navbar-expand-lg bg-dark navbar-dark justify-content-betweenf">
      <a class="navbar-brand" href="#">Blockchat</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Messaging<span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Blog<span class="sr-only">(current)</span></a>
          </li>
        </ul>
      </div>
      <div>
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active">
              My Profile
            </a>
          </li>
        </ul>
      </div>
    </nav> -->
      <v-layout row wrap justify-content-center>
        <form>
          <a href="#">
            <v-avatar :size="avatarSize">
              <img v-bind:src="src" id="thumbnail" alt="Thumbnail">
            </v-avatar>
          </a>
          <hr>
          <div class="form-group mt-3">
            <label>Ethereum ID</label>
            <input type="text" placeholder="Etheerium ID please" class="form-control">
            <small>This is needed for Contacts to reach you</small>
          </div>
          <div class="form-group">
            <label>Username</label>
            <input type="text" placeholder="Here comes your Username" class="form-control">
            <small>This will be displayed for Contacts</small>
          </div>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </v-layout>

  <!--<router-view></router-view>-->
  </v-container>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      src: '../static/ferhat.jpg',
    }
  },
  computed: {
    avatarSize(){
      return '180px'
    }
  }
}
</script>

<style>
  small{
    color:dimgrey;
  }
</style>
