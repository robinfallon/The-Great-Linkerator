import axios from 'axios';

export async function getSomething() {
  console.log('hello')
  try {
    const { data } = await axios.get('/api');
    return data;
  } catch (error) {
    throw error;
  }
}

/*
export async function getLinks() {
  try {
    const { data } = await axios.get('/api/link', {
      name, 
      url
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createTags() {
  try {
    const { data } = await axios.post('/api/tags', {
      name
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getTags() {
  try {
    const { data } = await axios.get('/api/tags', {
      name
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function countClicks() {
  try {
    const { data } = await axios.patch('/api/link', {
      clicks
    });
    return data;
  } catch (error) {
    throw error;
  }
}
*/