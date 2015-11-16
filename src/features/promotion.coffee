	`// @if TARGET=='nodejs'
	`
	class Promotion extends Abstract

		endpoint: 'promotions/cart'

		Search: (terms, callback, error) ->

			return @m.Request @endpoint+'/search', 'GET', terms, callback, error

	`// @endif
	`
