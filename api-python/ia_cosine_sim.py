import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer

from sklearn.metrics.pairwise import cosine_similarity

import pickle


#Get Data
games_df = pd.read_csv('data/more_games.csv')


#Stringfy columns
games_df['rating'] = games_df['rating'].astype(str)
games_df['metacritic'] = games_df['metacritic'].astype(str)
games_df['playtime'] = games_df['playtime'].astype(str)
games_df['platforms'] = games_df['platforms'].astype(str)
games_df['genres'] = games_df['genres'].astype(str)
games_df['stores'] = games_df['stores'].astype(str)
games_df['tags'] = games_df['tags'].astype(str)


#Make a single text column for data
games_df['features'] = games_df['name'] + ' ' + games_df['released'] + ' ' + games_df['rating'] + ' ' + games_df['metacritic'] + ' ' + games_df['playtime'] + ' ' + games_df['platforms'] + ' ' + games_df['genres'] + ' ' + games_df['stores'] + ' ' + games_df['tags'] + ' ' + games_df['esrb_rating']
games_df['features'] = games_df['features'].str.replace('{','')
games_df['features'] = games_df['features'].str.replace('}','')
games_df['features'] = games_df['features'].str.replace('"','')
games_df['features'] = games_df['features'].str.replace(',',' ')


#Convert string into numbers
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(games_df['features'].values.astype(str))


#Cosine similarity Calculation
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

#Save model
with open('data\cosine_similarity_matrix.pkl','wb') as f:

    pickle.dump(cosine_sim,f)