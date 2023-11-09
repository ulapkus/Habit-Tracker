import { initializeApp } from 'firebase-admin/app';

initializeApp({
    credential: applicationDefault(),
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
});

export async function POST(request) {
  // res = {username: "ula", password: "password"}
  const res = await request.json();
  const username = res.username;
  const password = res.password;
  return Response.json({ yourusername: username, yourpassword: password });
}


