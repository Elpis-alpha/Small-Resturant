import { Client } from "@notionhq/client";

const notion = new Client({
	auth: process.env.NOTION_INTEGRATION_TOKEN,
})

export const getAllProducts = async () => {
	if (typeof process.env.NOTION_DATABASE_ID !== "string") return false

	const menus = await notion.databases.query({
		database_id: process.env.NOTION_DATABASE_ID,
		sorts: [
			{
				property: "Name",
				direction: "ascending",
			},
		],
	});

	const allMenus = menus.results;

	return allMenus
};

export const getPageMetaData = (menu: any) => {
	return {
		id: menu.id,
		name: menu.properties.Name?.title?.[0]?.plain_text,
		price: menu.properties.Price?.number,
		description: menu.properties?.Description?.rich_text?.[0]?.plain_text,
		category: menu.properties.Category?.select?.name,
		image: menu.properties.Image.files?.[0]?.external ? menu.properties.Image.files?.[0]?.external?.url : menu.properties.Image.files?.[0]?.file?.url,
	};
};