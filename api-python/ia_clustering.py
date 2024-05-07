from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.cluster import KMeans
import pandas as pd
import datetime
import pickle

df = pd.read_csv('data/more_games.csv')

df['released'] = pd.to_datetime(df['released']).map(datetime.datetime.toordinal)

numerical_cols = ['released', 'rating', 'metacritic', 'playtime']
categorical_cols = ['platforms', 'genres', 'stores', 'tags', 'esrb_rating']

numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())])

categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)])

df_transformed = preprocessor.fit_transform(df)

kmeans = KMeans(n_clusters=8, init='k-means++', max_iter=400, n_init=10, random_state=20)
pred_y = kmeans.fit_predict(df_transformed)

# Lo de Pickle
with open('data/kmeans_model.pkl', 'wb') as file:
    pickle.dump(pred_y, file)