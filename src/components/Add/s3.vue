<template lang="html">
  <div class="ui container">
    <h1>HI from S3</h1>
    <div id="s3">

    </div>
    <div id="s3_status">

    </div>
  </div>
</template>

<script>
import 'aws-sdk/dist/aws-sdk'

export default {
  data: function () {
    return {
    }
  },
  computed: {},
  ready: function () {
    console.log('AWS')
    console.log(AWS)
    var creds = {
          'accessKeyId': 'Put tour ket here',
          'secretAccessKey': 'Put tour ket here'
        }
    AWS.config.update(creds)
    AWS.config.region = 'ap-southeast-1'
    var bucket = new AWS.S3({params: {Bucket: 'run-together'}});
    // var params = {Key: 'data2.txt', Body: 'adisak chaiyakul'};
    // bucket.upload(params, function (err, data) {
    //   if (err) {
    //     alert('err')
    //     console.log('ERR from aws')
    //     console.log(err)
    //   } else {
    //     alert('success')
    //
    //   }
    // })
    bucket.listObjects(function (err, data) {
      console.log('hi from s3')
      if (err) {
        console.log('Could not load objects from S3')
      } else {
        // alert('hi')
        document.getElementById('s3_status').innerHTML =
          'Loaded ' + data.Contents.length + ' items from S3';
        for (var i = 0; i < data.Contents.length; i++) {
          document.getElementById('s3').innerHTML +=
            '<li>' + data.Contents[i].Key + '</li>';
        }
      }
    })
  },
  attached: function () {},
  methods: {},
  components: {}
}
</script>
<style lang="css">
</style>
