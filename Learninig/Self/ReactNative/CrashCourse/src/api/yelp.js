import axios from "axios"

export default axios.create({
	baseURL:"https://api.yelp.com/v3/businesses",
	headers: {
		Authorization:
		"Bearer L19VSyKuJo2CMYFhmCiHd4taMpW5CaNxvODIGsVPAL3k7ZiMmLcI_N2CusnV3Njf00MJG7MrKQgyuSCjwZNGqoIj0lLA3o-wccH7I1lT1eNYZdmGsee2ldW-oMaTYnYx"
	}
})
