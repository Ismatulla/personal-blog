// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql, GraphQLClient } from "graphql-request";
const graphqlAPI = 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl8jzea7a16hg01ueclaq1bum/master'

export default async function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjQzODQwOTQsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY2w4anplYTdhMTZoZzAxdWVjbGFxMWJ1bS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiZGI1ZmI4ODYtZTNkYy00YTA1LTg4OWQtOGQ1YWExYTE5YmUxIiwianRpIjoiY2w4bHZiZWxwM2F5aDAxdDBnNjVxMndzNSJ9.n5i6l4qVirlCKzLQsxyzdU2Y8deVhKXDsNOOUhVUwTwU5uRV_1AM17d4fbTj09Hv1Mgvaso-bwRcM_hFaaKT87rnNHzXyf3ZqffnPh60LXRSUwA3sNEpxqLYoL1njeiDvT0VzTJEHBp9Xn9qX89ORM18bw1LfyRpBOnS3AVlsND9xgCG5rbbPHGFrceA5dNsV2FyNT_b7WR3KRu78mDh1GEb99YTWeKryvSWbrlPDn5pHxtZghGjTvo-rUKtv9XxU4r9c2MnLc3G42RiwQRcLY0Fb-KqXUYXfMGtY13uEq2q70lMxlzRpdg4Ly6u6o_qTYXwzxF8Iv8ujT3432fgPeJ7Z9e2iyyAD--tIPKQS5shBZUl2BzVXsqcnmp69UyXxMGxJSb9vTrBv2DagBZJ4f3n5YdPXBcBilFoX0vduvoymypwzphUw8F_pxWQtprs-uoeAd7U5r4zNHKhVTrHZ8B6n1WJHEutGEkpEH9COMr7txbsi6iXGV-_YYYOjK-NA8j0KH_Tti1qRCldQfCazIzQv3g01CbuAc50sRzSEIQWmETfzebtsmRng4_fFon5d2dJ_oq4sQZkjYkY1wzild9CX1gRUF-Q3AdKXAqVsBUXOAH0Wh09c_v4HkatxQpXHxFOrfVX1wut9iuT7LjN4wLApSfCak-B4amtbYpFZCU'}`
    }
  })
  const query = gql`
  mutation CreateComment($name:String!,$email:String!,$comment:String!,$slug:String){
    createComment(data:{name:$name,email:$email,comment:$comment,post:{connect:{slug:$slug}}}){id}
  }
  `
  try {
    const result = graphQLClient.request(query, req.body)
    return res.status(200).send(result)
  } catch (err) {
    console.log(err);
  }
}