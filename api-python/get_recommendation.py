import pandas as pd
import pickle

games_df = pd.read_csv('data\more_games.csv')

def recommend_consine(title):

    #open pickle file
    with open('data\cosine_similarity_matrix.pkl','rb') as f:

        #load similarity matrix and dataframe
        cosine_sim = pickle.load(f)
        index = games_df[games_df['name']==title].index[0]

        #Get similarity scores of all games
        sim_scores = list(enumerate(cosine_sim[index]))

        #sort games based on scores
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        #Get 10 most similar games
        sim_scores = sim_scores[1:11]

        #Get indices
        game_index = [i[0] for i in sim_scores]
        games_array=[]

        #Create array of objects to return with score
        for i in game_index:
            game = {
                'id': int(games_df['id'].iloc[i]),
                'name': games_df['name'].iloc[i]
            }
            games_array.append(game)
        
        #Return
        return games_array

#print(recommend_consine('Hitman'))

def recommend_cluster(game_id, num_recommendations=10):
    with open('data\kmeans_model.pkl','rb') as f:
        pred_y = pickle.load(f)
    if game_id not in games_df['id'].values:
        print(f"No se encontró ningún juego con el ID {game_id}.")
        return

    game_index = games_df[games_df['id'] == game_id].index[0]    
    game_cluster = pred_y[game_index]
    similar_games = games_df[pred_y == game_cluster]
    input_game_genre = games_df.loc[game_index, 'genres'].split(',')
    input_game_tags = games_df.loc[game_index, 'tags'].split(',')

    #similar_games = similar_games[similar_games['genres'] == input_game_genre]
    #similar_games = similar_games[similar_games['id'] != game_id]
    #similar_games = similar_games.sort_values(by=['genres'], ascending=[False]).head(num_recommendations)
    
    similar_games_genre = similar_games[similar_games['genres'].apply(lambda x: sum(genre in x.split(',') for genre in input_game_genre) >= 2)]
    similar_games_genre = similar_games_genre[similar_games_genre['id'] != game_id]
    similar_games_genre = similar_games_genre.sort_values(by=['genres'], ascending=[False])

    if len(similar_games_genre) < num_recommendations:
        remaining_rec = num_recommendations - len(similar_games_genre)
        similar_games_tags = similar_games[similar_games['genres'].apply(lambda x: any(tag in x.split(',') for tag in input_game_tags))]
        similar_games_tags = similar_games_tags[similar_games_tags['id'] != game_id]
        similar_games_tags = similar_games_tags.sort_values(by=['genres'], ascending=[False]).head(remaining_rec)
        similar_games = pd.concat([similar_games_genre, similar_games_tags])
    else:
        similar_games = similar_games_genre.head(num_recommendations)

    games_array = []
    for index, row in similar_games.iterrows():
        #print(f"{counter + 1}. {row['name']}")
        game = {
            'id': row['id'],
            'name': row['name']
        }
        games_array.append(game)
    
    return games_array

#print(recommend_cluster(game_id=2869))