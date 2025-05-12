// RecipeCard.js

class RecipeCard extends HTMLElement {
	// Called once when document.createElement('recipe-card') is called, or
	// the element is written into the DOM directly as <recipe-card>
	constructor() {
		super(); // Inherit everything from HTMLElement

		// EXPOSE - START (All expose numbers start with A)
		// A1. TODO - Attach the shadow DOM to this Web Component (leave the mode open)
		// A2. TODO - Create an <article> element - This will hold our markup once our data is set
		// A3. TODO - Create a style element - This will hold all of the styles for the Web Component
		// A4. TODO - Insert all of the styles from cardTemplate.html into the <style> element you just made (copy everything INSIDE the <style> tag>)
		// A5. TODO - Append the <style> and <article> elements to the Shadow DOM
		let shadowElement = this.attachShadow({mode:'open'});
		let elementRoot = document.createElement('article');

		let style = document.createElement('style');
		style.innerText = `
			* {
				font-family: sans-serif;
				margin: 0;
				padding: 0;
			}

			a {
				text-decoration: none;
			}

			a:hover {
				text-decoration: underline;
			}

			article {
				align-items: center;
				border: 1px solid rgb(223, 225, 229);
				border-radius: 8px;
				display: grid;
				grid-template-rows: 118px 56px 14px 18px 15px 36px;
				height: auto;
				row-gap: 5px;
				padding: 0 16px 16px 16px;
				width: 178px;
			}

			div.rating {
				align-items: center;
				column-gap: 5px;
				display: flex;
			}

			div.rating>img {
				height: auto;
				display: inline-block;
				object-fit: scale-down;
				width: 78px;
			}

			article>img {
				border-top-left-radius: 8px;
				border-top-right-radius: 8px;
				height: 118px;
				object-fit: cover;
				margin-left: -16px;
				width: calc(100% + 32px);
			}

			p.ingredients {
				height: 32px;
				line-height: 16px;
				padding-top: 4px;
				overflow: hidden;
			}

			p.organization {
				color: black !important;
			}

			p.title {
				display: -webkit-box;
				font-size: 16px;
				height: 36px;
				line-height: 18px;
				overflow: hidden;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}

			p:not(.title),
			span,
			time {
				color: #70757A;
				font-size: 12px;
			}`;
		
		elementRoot.appendChild(style);
		shadowElement.appendChild(elementRoot);
	}

	/**
	 * Called when the .data property is set on this element.
	 *
	 * For example:
	 * let recipeCard = document.createElement('recipe-card'); // Calls constructor()
	 * recipeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
	 *
	 * @param {Object} data - The data to pass into the <recipe-card> must be of the
	 *                        following format:
	 *                        {
	 *                          "imgSrc": "string",
	 *                          "imgAlt": "string",
	 *                          "titleLnk": "string",
	 *                          "titleTxt": "string",
	 *                          "organization": "string",
	 *                          "rating": number,
	 *                          "numRatings": number,
	 *                          "lengthTime": "string",
	 *                          "ingredients": "string"
	 *                        }
	 */
	set data(data) {
		// If nothing was passed in, return
		if (!data) return;

		// A6. TODO - Select the <article> we added to the Shadow DOM in the constructor
		// A7. TODO - Set the contents of the <article> with the <article> template given in
		//           cardTemplate.html and the data passed in (You should only have one <article>,
		//           do not nest an <article> inside another <article>). You should use template
		//           literals (template strings) and element.innerHTML for this.
		// 			 Do NOT include the <article> tags within the innerHTML of the element you create.
		//           Remember to replace all the placeholders in the template with the data passed in.
		//           i.e. imgSrc, titleLnk, etc
		let container = this.shadowRoot.querySelector('article');

		let recipeThumbnail = document.createElement('img');
		recipeThumbnail.src = data.imgSrc;
		recipeThumbnail.alt = data.imgAlt;
		container.appendChild(recipeThumbnail);

		let title = document.createElement('p');
		title.classList.add('title');
		let articleLink = document.createElement('a');
		articleLink.href = data.titleLnk;
		articleLink.innerText = data.titleTxt;
		title.appendChild(articleLink);
		container.appendChild(title);

		let org = document.createElement('p');
		org.classList.add('organization');
		org.innerText = data.organization;
		container.appendChild(org);

		let rating = document.createElement('div');
		rating.classList.add('rating');
		let numStars = document.createElement('span');
		numStars.innerText = data.rating;
		rating.appendChild(numStars);
		let starsIcon = document.createElement('img');
		starsIcon.src = `./assets/images/icons/${data.rating}-star.svg`;
		starsIcon.alt = `${data.rating} stars`;
		rating.appendChild(starsIcon);
		let numRatings = document.createElement('span');
		numRatings.innerText = `(${data.numRatings})`;
		rating.appendChild(numRatings);
		container.appendChild(rating);

		let time = document.createElement('time');
		time.innerText = data.lengthTime;
		container.appendChild(time);

		let ingredients = document.createElement('p');
		ingredients.classList.add('ingredients');
		ingredients.innerText = data.ingredients;
		container.appendChild(ingredients);
	}
}

// A8. TODO - Define the Class as a customElement so that you can create
//           'recipe-card' elements
customElements.define('recipe-card', RecipeCard);