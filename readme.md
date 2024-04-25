# API Documentation

The API provides functionality to upload files, either temporarily or permanently, and allows marking them as public or private. Here's a description you can use to explain the API:

- **Upload Temporary File:** Use the /upload endpoint with the minutes parameter to specify the number of minutes the file will be stored before being automatically deleted.
- **Upload Permanent File:** If marked as permanentFile, the file will be stored permanently on the server.
- **Mark File as Private:** When uploading a file, you can mark it as private using the privateFile parameter. Private files are only accessible using a specific key.
- **Public Access to Files:** Files marked as public are available for download without needing a key.
- **Delete Files:** You can delete files using the /delete/:id endpoint by providing the ID of the file you want to delete. Deleted files cannot be recovered.
- **Download Files:** Public files can be downloaded using the /download/:id endpoint by providing the ID of the file you want to download.

## Upload a File

- **URL:** `/upload`
- **Method:** `POST`
- **Description:** Uploads a file along with additional parameters.
- **Parameters:**
  - `file` (file): The file to upload
  - `minutes` (number): Number of minutes to store the file (optional)
  - `privateFile` (boolean): Flag indicating if the file should be private (optional)
  - `permanentFile` (boolean): Flag indicating if the file should be stored permanently (optional)
- **Access:** Public

## Get a File by ID

- **URL:** `/file/:id`
- **Method:** `GET`
- **Description:** Gets a file by its ID.
- **Parameters:**
  - `id` (string): The ID of the file to get
- **Access:** Public

## Get a Private File

- **URL:** `/file/:id?key=your_key_here`
- **Method:** `GET`
- **Description:** Gets a private file by ID and key.
- **Parameters:**
  - `id` (string): The ID of the file to get
  - `key` (string): The key used to access the private file
- **Access:** Private

## Download a File

- **URL:** `/download/:id`
- **Method:** `GET`
- **Description:** Downloads a file
- **Parameters:**
  - `id` (string): The ID of the file to download
- **Access:** Public

## Delete a File

- **URL:** `/delete/:id`
- **Method:** `DELETE`
- **Description:** Deletes a file
- **Parameters:**
  - `id` (string): The ID of the file to delete
- **Access:** Private

## Get a File by ID

- **URL:** `/file/:id`
- **Method:** `GET`
- **Description:** Gets a file by ID
- **Parameters:**
  - `id` (string): The ID of the file to get
- **Access:** Public
