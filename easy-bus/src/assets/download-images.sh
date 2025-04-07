#!/bin/bash

# Create array of school image URLs from Unsplash
urls=(
    "https://images.unsplash.com/photo-1546519638-68e109fd3a4b?w=800&h=600&fit=crop"
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop"
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop"
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop"
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop"
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop"
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop"
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop"
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&h=600&fit=crop"
)

# Download each image
for i in {1..10}; do
    curl -L "${urls[$i-1]}" -o "school$i.jpg"
done

echo "Images downloaded successfully!" 