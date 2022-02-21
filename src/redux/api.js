import axios from "axios"

const request=axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
  params:{
    key:"AIzaSyBXElX-mbyFOwYFYpf_1Qixv-BT-QaDJaM"
  }
})
export default request
