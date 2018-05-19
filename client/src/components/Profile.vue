 <template>
  <div id="test">
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

    <div class="container">
      <div class="row">
        <form class="mx-auto">
          <a href="#" class="mx-auto d-flex justify-content-center">
            <img v-bind:src="src" id="thumbnail" class="img-thumbnail rounded-circle" alt="Thumbnail">
          </a>
          <div class="form-group">
            <label>Ethereum ID</label>
            <input type="text" placeholder="Etheerium ID please" class="form-control">
            <small>This is needed for Contacts to reach you</small>
          </div>
          <div class="form-group">
            <label>Username</label>
            <input type="text" placeholder="Here comes your Username" class="form-control">
            <small>This is needed for Contacts to reach you</small>
          </div>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  <!--<router-view></router-view>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      src: '../static/ferhat.jpg',
    }
  }
}
</script>

<style>
  a{
    width:30%;
  }
  small{
    color:dimgrey;
  }
</style>
