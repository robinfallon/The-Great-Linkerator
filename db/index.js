/* Responsible for creating all of your 
database connection functions ---- helper functions we
use throughout app */

// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkerator'
const DB_URL = process.env.DATABASE_URL || `postgres://${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods

async function createLinkEntry({
  name,
  url
}) {
    try {
      const { rows: [ link ] } = await client.query(`
      INSERT INTO link(name, url) 
      VALUES($1, $2) 
      ON CONFLICT (username) DO NOTHING 
      RETURNING *;
      `, [name, url]);

    return link;
  } catch (error) {
    throw error;
  }
}

async function createTags({
  name
}) {
  try {
    const { rows: [ tags ] } = await client.query(`
      INSERT INTO tags(name) 
      VALUES($1)
      RETURNING *;
    `, [name]);

    const tagList = await createTags();

    return await addTagsToPost(post.id, tagList);
  } catch (error) {
    throw error;
  }
}

async function addTagsToEntry(tagsId, tagList) {
  try {
    const createPostTagPromises = tagList.map(
      tags => createTag(tagsId, tags.id)
    );

    await Promise.all(createTagPromises);

    return await getTagById(tagId);
  } catch (error) {
    throw error;
  }
}

async function getAllLinkEntries() {
  try {
    const { rows: postIds } = await client.query(`
      SELECT name, url
      FROM link;
    `);

    const linkEntries = await Promise.all(linkIds.map(
      link => getLinkById( link.id )
    ));

    return link;
  } catch (error) {
    throw error;
  }
}


async function addLink() {
  try {
    const { rows } = await client.query(`
      SELECT name, url
      FROM link;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function addComment() {
  try {
    const { rows } = await client.query(`
      SELECT "tags", "link"
      FROM linkTags;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function addTag() {
  try {
    const { rows } = await client.query(`
      SELECT name, 
      FROM tags;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function popData() {
  try {
    const { rows } = await client.query(`
      SELECT name, url
      FROM link;
    `);

    return rows;
  } catch (error) {
    throw error;
  }
}


// export
module.exports = {
// db methods
  client,
  createLinkEntry,
  addTagsToEntry,
  createTags,
  getAllLinkEntries,
  addLink,
  addComment,
  addTag,
  popData
}