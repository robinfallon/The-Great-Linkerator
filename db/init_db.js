/* Should be run when you need to rebuild your 
tables and seed data */

// code to build and initialize DB goes here
const {
  client,
  // other db methods 
  createLinkEntry,
  addTagsToEntry,
  createTags,
  getAllLinkEntries,
  addLink,
  addComment,
  addTag,
  popData
} = require('./index');

/*------------------------DROPtABLES------------------------- */
async function drop() {
  try {
    console.log("Starting to drop tables...");

    await client.query(`
      DROP TABLE IF EXISTS linkTags;
      DROP TABLE IF EXISTS tags;
      DROP TABLE IF EXISTS link;
    `);

    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}

/*------------------------BUILDtABLES------------------------- */
async function buildTables() {
  try {
    console.log('Starting to build tables...')

    // build tables in correct order
    await client.query(`
      CREATE TABLE link (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL,
        url varchar(255) NOT NULL
      );
      CREATE TABLE tags (
        id SERIAL PRIMARY KEY,
        name varchar(255) UNIQUE NOT NULL
      );
      CREATE TABLE linkTags (
        "tagsId" INTEGER REFERENCES tags(id),
        "linkId" INTEGER REFERENCES link(id)
      );
    `);
    console.log('Finished building tables!')
  } catch(error) {
    console.log('Error building tables!');
    throw error;
  }
};

/*------------------------INSERTlINK------------------------- */
async function insertLink({ name, url }) {
  try {
    await client.query(`
      INSERT INTO links (name, url)
      VALUES ($1, $2)
      RETURNING *;
      `,
      [name, url]
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/*------------------------POPULATEiNITIALdATA------------------------- */
async function populateInitialData() {
  try {
    const [YouTube, Reddit, Google] = await popData();
    // create useful starting data
    await insertLink({
      name: "YouTube",
      url: "https://www.youtube.com",
    });

    await insertLink({
      name: "Reddit",
      url: "https://www.reddit.com"
    });

    await insertLink({
      name: "Google",
      url:"https://www.google.com"
    });
    console
  } catch (error) {
    throw error;
  }
};

/*------------------------CREATEtAGS------------------------- */

async function createTags(name) {
  try {
    const {
      rows: [tags],
    } = await client.query(`
      INSERT INTO tags(name)
      VALUES ($1)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `,
    [name]
    );
    return tags;

  } catch (error) {
    console.error(error);
    throw(error);
  }
};

/*------------------------INSERTtAGS------------------------- */
async function insertTags({ id, name }) {
  try {
    await client.query(`
      INSERT INTO tags (id, name)
      VALUES ($1, $2)
      RETURNING *;
    `,
    [id, name]
    );
  } catch (error) {
    throw error;
  }
};

/*------------------------INSERTlINKtAGS------------------------- */
async function insertLinkTags({ id, tagsId, linkId }) {
  try {
    await client.query(`
      INSERT INTO linkTags (id, 'tagsId', 'linkId')
      VALUES ($1, $2, $3)
      RETURNING *;
    `,
    [id, tagsId, linkId]
    );
  } catch(error) {
    console.error(error);
    throw error;
  }
};

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());