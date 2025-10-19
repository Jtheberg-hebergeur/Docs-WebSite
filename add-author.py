#!/usr/bin/env python3
"""
Script pour ajouter automatiquement les metadonnees d'auteur a tous les fichiers Markdown
"""
import os
import re

AUTHOR_FRONTMATTER = """---
author: Kiz___
author_title: President de Jtheberg.cloud
author_url: https://github.com/KizYTB
author_image_url: https://github.com/KizYTB.png
---

"""

def has_frontmatter(content):
    """Verifie si le fichier a deja un front matter"""
    return content.strip().startswith('---')

def add_author_to_file(filepath):
    """Ajoute les metadonnees d'auteur au fichier"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Si le fichier a deja un front matter, on l'ignore
        if has_frontmatter(content):
            print(f"Ignore (deja un front matter): {filepath}")
            return False
        
        # Ajoute le front matter au debut
        new_content = AUTHOR_FRONTMATTER + content
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"Ajoute: {filepath}")
        return True
    except Exception as e:
        print(f"Erreur avec {filepath}: {e}")
        return False

def process_directory(directory):
    """Traite tous les fichiers .md dans le repertoire"""
    count = 0
    for root, dirs, files in os.walk(directory):
        # Ignore certains dossiers
        if 'node_modules' in root or '.git' in root:
            continue
            
        for file in files:
            if file.endswith('.md') and file not in ['SUMMARY.md']:
                filepath = os.path.join(root, file)
                if add_author_to_file(filepath):
                    count += 1
    
    return count

if __name__ == '__main__':
    docs_dir = os.path.join(os.path.dirname(__file__), 'docs')
    print(f"Traitement du repertoire: {docs_dir}")
    print("-" * 50)
    
    count = process_directory(docs_dir)
    
    print("-" * 50)
    print(f"Termine! {count} fichiers modifies.")
