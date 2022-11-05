// todo
import React, { useContext } from "react";
import LocalizedStrings from "react-localization";

const LngContext = React.createContext();

// todo - 1
export const useLng = () => {
	return useContext(LngContext);
};

// todo - 2
export const LngProvider = ({ children }) => {
	// ? ---
	const strings = new LocalizedStrings({
		// GB: {
		// 	title: "My Wordbook",

		// 	tab1: "Wordbook",
		// 	tab1_f1: "Learned words",
		// 	tab1_f2: "New words",
		// 	tab1_f3: "text filter...",
		// 	tab1_1: "Pronounce a word",
		// 	tab1_2: "Remove word",
		// 	tab1_3: "Edit word",
		// 	tab1_4: "Change word status",
		// 	tab_a: "dictionary is empty",

		// 	tab2: "Add a new word",
		// 	tab2_1: "Add New Word",
		// 	tab2_2: "Word",
		// 	tab2_2_1: "This field is required.",
		// 	tab2_3: "Pronounsation",
		// 	tab2_4: "POS",
		// 	tab2_5: "Translation",
		// 	tab2_6: "Example",
		// 	tab2_7: "Add",
		// 	tab2_8: "Attempt to enter inappropriate data.",

		// 	tab3: "Spelling work",
		// 	tab3_1: "Spelling",
		// 	tab3_2: "cw",
		// 	tab3_22: "The current word number",
		// 	tab3_3: "tw",
		// 	tab3_33: "Total number of words",
		// 	tab3_4: "ca",
		// 	tab3_44: "Number of correct answers",
		// 	tab3_5: "ia",
		// 	tab3_55: "Number of incorrect answers",
		// 	tab3_6: "Armenian",
		// 	tab3_7: "English",
		// 	tab3_7_c: "Your answer is correct.",
		// 	tab3_7_i: "What a pity! Your answer is wrong.",
		// 	tab3_8: "Answer",
		// 	tab3_9: "H i n t",
		// 	tab3_10: "Check",
		// 	tab3_11: "You have no difficult words.",

		// 	tab4: "Statistics",
		// 	// tab4_1: "Բառատետրում բառերի քանակն է՝ ","The number of words in the dictionary is: "
		// 	tab4_1: "Number of words by initials.",
		// 	tab4_2: "The number of words in the dictionary is: ",
		// 	tab4_3: ". The last addition was: ",

		// 	tab5: "Read aloud",
		// 	tab5_1: "To read the text here ...",
		// 	tab5_2: "Play Button",
		// 	tab5_3: "Pause Button",
		// 	tab5_4: "Stop Button",

		// 	tab6: "Download-Upload",
		// 	tab6_1: "Pick a file for import!",
		// 	tab6_2: "Error : No file selected",
		// 	tab6_3: "Error: Invalid file selected.",
		// 	tab6_4: "Error: Invalid or damaged file selected.",
		// 	tab6_5: "Dictionary successfully downloaded.",

		// 	tab7: "Useful links",
		// 	tab7_1: "Useful links",
		// 	tab7_2: "Armenian Dictionaries",
		// 	tab7_3: "Armenian Online Dictionary",
		// 	tab7_4: "Armenian dictionary",
		// 	tab7_5: "English-Armenian Dictionary | Glosbe",
		// 	tab7_6: "Oxford Learner's Dictionaries",
		// 	tab7_7: "Pronunciation guide for English",
		// 	tab7_8: "Grammar Checker",

		// 	tab8: "S e t t i n g s",
		// 	tab8_1: "Select language",
		// },

		AM: {
			title: "Ինտերնետ խանութ",

			tab1: "Խանութ",
			tab1_0: "Առաջին էջ",
			tab1_2: "Նախորդ էջ",
			tab1_3: "Հաջորդ էջ",
			tab1_4: "Վերջին էջ",

			tab1_1: "Ավելացնել քարտին",
			// tab1_2: "Հեռացնել բառը",
			// tab1_3: "Խմբագրել բառը",
			// tab1_4: "Փոխել բառի ստատուսը",
			tab1_a: "Վերադառնալ գլխավոր էջ",

			tab2: "Քարտ",
			tab2_1: "Ձևակերպել պատվեր", //տես  բանդիտի մոտ
			// tab2_2: "Բառ",
			// tab2_2_1: "Այս դաշտը լրացնելը պարտադիր է։",
			// tab2_3: "Արտասանություն",
			// tab2_4: "Խոսքի Մաս",
			// tab2_5: "Թարգմանություն",
			// tab2_6: "Օրինակ",
			// tab2_7: "Ավելացնել",
			// tab2_8: "Անհամապատասխան տվյալի մուտքագրման փորձ։",

			// todo - user
			tab3a: "Մուտք",
			tab3b: "Ելք",
			// tab3_1: "Login to Your Account",
			tab3_1: "Մուտք համակարգ",
			// tab3_2: "Remember me",
			tab3_2: "Հիշել",
			tab3_3: "Նոր ծածկագիր՞",
			tab3_4: "Մուտք համակարգ",
			tab3_5: "Չունեք հաշիվ՞",
			tab3_6: "Գրանցել այստեղ",

			//?
			tab3_7: "Ստեղծել նոր հաշիվ",
			tab3_8: "Գրանցվել",
			// tab3_9: "Already have an account?",
			tab3_9: "Արդեն ունենք՞ հաշիվ",
			// tab3_10: "Login here",
			tab3_10: "Մուտք համակարգ",
			// tab3_11: "Reset your password?",
			tab3_11: "Վերակայե՞լ ձեր գաղտնաբառը",
			// tab3_12:
			// 	"Enter your email and new password. We'll send you a reset link.",
			tab3_12: "Մուտքագրեք ձեր էլ. Փոստը և նոր գաղտնաբառը:",
			tab3_12a: " Մենք ձեզ կուղարկենք զրոյացման հղում:",
			tab3_13: "Ուղարկել գաղտնաբառի վերակայումը",
			// tab3_13: "Remember your password?",
			tab3_14: "Հիշո՞ւմ եք ձեր գաղտնաբառը:",
			tab3_15: "Մուտք համակարգ",
			tab3_16: "Ելք համակարգից", // Log out
			// tab3_13: "Remember your password?",

			// todo - Հետադարձ կապ
			tab4: "Հետադարձ կապ",
			tab4_1: "Ունեք հարցեր՝ գրեք մեզ։", //  Any questions? Feel free to contact us.
			tab4_2: "Ուղղարկել", // "Send"
			tab4_3: "Մաքրել",

			// todo - Վահանակ - store
			tab5: "Վահանակ",
			tab5_1: "Արտահանել CSV ֆայլ", // Export CSV!
			tab5_2: "Ավելացնել", //Add
			tab5_3: "Խմբագրել", //"Edit"
			tab5_4: "Հեռացնել", //Del

			tab5_5: "Ապրանքի տվյալները",
			tab5_6b: "Փոխել", //Change
			tab5_6a: "Ընտրել", // Browse
			tab5_7: "Վերբեռնել", // Upload
			tab5_8: "Ընտրեք նկարը",
			tab5_9: "առավելագույն չափը:",

			tab5_10: "Ապրանքի տվյալների խմբագրում։",
			tab5_11: "Անուն",
			tab5_12: "Քանակ",
			tab5_13: "Գին",
			tab5_14: "Պահպանել փոփոխությունները",
			// tab5_9: "առավելագույն չափը:",
			// tab5_9: "առավելագույն չափը:",

			// todo
			tab6: "Ծանուցում",
			// tab6_1: "Ընտրեք ներբեռնվող ֆայլը",
			// tab6_2: "Ֆայլ չի ընտրվել",
			// tab6_3: "Սխալ ֆայլ է ընտրված։",
			// tab6_4: "Սխալ կամ վնասված ֆայլ է ընտրված։",
			// tab6_5: "Բառարանը հաջողությամբ Ներբեռնվեց։",

			// tab7: "էջափոխում",
			tab7_1: "Գնալ էջ",
			tab7_2: "Քանակը էջում",
			tab7_3: "Էջ",
			tab7_4: "ընդ.",
			// tab7_5: "Անգլերեն-Հայերեն Բառարան | Glosbe",
			// tab7_6: "Օքսֆորդի սովորողի բառարաններ»",
			// tab7_7: "Արտասանության ուղեցույց անգլերենի համար",
			// tab7_8: "Քերականության ստուգիչ",

			// tab8: "Կարգավորումներ",
			// tab8_1: "Ընտրել լեզուն",
		},
	});

	// ? ---
	return (
		<LngContext.Provider value={strings}>{children}</LngContext.Provider>
	);
};
